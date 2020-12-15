window.onload = () => {
  const tasks = [];
  const btnAddTask = document.getElementById('btnAddTask');
  const tbody = document.getElementById('tbodyTasks');
  const btnCheckStatus = document.getElementsByName('checkedStatus');
  const taskStatus = {
    all: '0',       // すべて
    working: '1',   // 作業中
    complete: '2'   // 完了
  };

  const setEvent= () => {
    // 追加ボタン押下時の処理
    btnAddTask.addEventListener('click', () => {
      const inputTask = document.getElementById('textInputTask');
      tasks.push({
        content: inputTask.value,
        status: taskStatus.working
      });
      dispTask();
      inputTask.value = '';
    });

    // ラジオボタン変更時の処理をセット
    btnCheckStatus.forEach((e) => {
      e.addEventListener('change', () => {
        changeTask();
      });
    });
  }

  /**
   * タスクを表示
   */
  const dispTask = () => {
    // IDを再設定するため一度タスクを削除
    tbody.textContent = '';
    tasks.forEach((value, index) => {
      const row = document.createElement('tr');
      const statusVal = value.status === taskStatus.working ? '作業中' : '完了';
      // 行追加
      row.appendChild(createCell(index, true, value.status));
      row.appendChild(createCell(value.content, false));
      row.appendChild(createButton(statusVal, index, changeStatus));
      row.appendChild(createButton('削除', index, deleteTask));
      tbody.appendChild(row);
    });
    changeTask();
  };

  /**
   * 表示するタスクを変更
   */
  const changeTask = () => {
    const rows = tbody.querySelectorAll('tr');
    let checkedVal = taskStatus.all;
    btnCheckStatus.forEach((e) => {
      if(e.checked) checkedVal = e.value;
    });
    rows.forEach((e) => {
      e.style.display = e.cells[0].dataset.status === checkedVal || checkedVal === taskStatus.all ? '' : 'none';
    });
  };

  /**
   * タスクの削除処理
   * @param {number} index - 削除するタスクID 
   */
  const deleteTask = (index) => {
    tasks.splice(index, 1);
    dispTask();
  };

  /**
   * タスクの状態を変更
   * @param {number} index - 状態を変更するタスクID 
   */
  const changeStatus = (index) => {
    tasks[index].status = tasks[index].status === taskStatus.working ? taskStatus.complete : taskStatus.working;
    dispTask();
  };

  /**
   * Cellを生成
   *  
   * @param {string}  value     - cellの文字
   * @param {boolean} isDataSet - データセットフラグ
   * @param {string}  status    - タスクのステータス
   * @return {object} cell      - cellのDOM
   */
  const createCell = (value, isDataSet, status) => {
    const cell = document.createElement('td');
    cell.textContent = value;
    if(isDataSet) cell.dataset.status = status;
    return cell;
  };

  /**
   * ボタンのCellを生成
   *  
   * @param {string} value      - ボタンの文字 
   * @param {number} index      - タスクID 
   * @param {object} clickEvent - クリック時のイベント
   * @return {object} cell      - buttonCellのDOM
   */
  const createButton = (value, index, clickEvent) => {
    const cell = document.createElement('td');
    const button = document.createElement('input');
    button.type = 'button';
    button.value = value;
    button.onclick = () => { clickEvent(index) };
    cell.appendChild(button);
    return cell;
  };

  setEvent();
};

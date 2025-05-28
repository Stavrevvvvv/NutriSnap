// Load items from localStorage if available
let items = JSON.parse(localStorage.getItem('items')) || [
  'Recipe 1',
  'Recipe 2',
  'Recipe 3'
];

let lastDeletedItem = null;
let lastDeletedIndex = null;

// Function to render the list with delete buttons
function renderList() {
  const container = document.getElementById('item-list');
  container.innerHTML = '';
  items.forEach((item, index) => {
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.marginBottom = '8px';

    const span = document.createElement('span');
    span.textContent = item;
    span.style.marginRight = '12px';

    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.onclick = function() {
      lastDeletedItem = items[index];
      lastDeletedIndex = index;
      items.splice(index, 1);
      localStorage.setItem('items', JSON.stringify(items));
      renderList();
      renderUndoButton();
      showTempMessage('Item deleted.');
    };

    div.appendChild(span);
    div.appendChild(btn);
    container.appendChild(div);
  });
}

function renderUndoButton() {
  let undoBtn = document.getElementById('undo-btn');
  if (undoBtn) {
    undoBtn.remove();
  }
  if (lastDeletedItem !== null) {
    undoBtn = document.createElement('button');
    undoBtn.id = 'undo-btn';
    undoBtn.textContent = 'Undo Delete';
    undoBtn.style.marginTop = '12px';
    undoBtn.onclick = function() {
      if (lastDeletedItem !== null && lastDeletedIndex !== null) {
        items.splice(lastDeletedIndex, 0, lastDeletedItem);
        localStorage.setItem('items', JSON.stringify(items));
        lastDeletedItem = null;
        lastDeletedIndex = null;
        renderList();
        renderUndoButton();
        showTempMessage('Undo successful.');
      }
    };
    document.body.appendChild(undoBtn);
  }
}

function showTempMessage(msg) {
  let msgDiv = document.getElementById('temp-msg');
  if (!msgDiv) {
    msgDiv = document.createElement('div');
    msgDiv.id = 'temp-msg';
    msgDiv.style.position = 'fixed';
    msgDiv.style.top = '20px';
    msgDiv.style.left = '50%';
    msgDiv.style.transform = 'translateX(-50%)';
    msgDiv.style.background = '#4caf50';
    msgDiv.style.color = 'white';
    msgDiv.style.padding = '10px 20px';
    msgDiv.style.borderRadius = '5px';
    msgDiv.style.zIndex = '1000';
    document.body.appendChild(msgDiv);
  }
  msgDiv.textContent = msg;
  msgDiv.style.display = 'block';
  setTimeout(() => {
    msgDiv.style.display = 'none';
  }, 1500);
}

// Initial render on page load
document.addEventListener('DOMContentLoaded', function() {
  // Create a container if it doesn't exist
  let container = document.getElementById('item-list');
  if (!container) {
    container = document.createElement('div');
    container.id = 'item-list';
    document.body.appendChild(container);
  }
  renderList();
  renderUndoButton();
});

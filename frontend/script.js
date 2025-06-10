const API = "http://localhost:5000/items";

const form = document.getElementById("item-form");
const list = document.getElementById("item-list");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const quantity = document.getElementById("quantity").value;
  const item = { id: Date.now().toString(), name, quantity };

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });

  form.reset();
  loadItems();
});

async function loadItems() {
  const res = await fetch(API);
  const items = await res.json();
  list.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.quantity}`;
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = async () => {
      await fetch(`${API}/${item.id}`, { method: "DELETE" });
      loadItems();
    };
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

loadItems();

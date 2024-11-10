let tickets = [
  {
    "id": 0,
    "name": "肥宅心碎賞櫻3日",
    "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    "area": "高雄",
    "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    "group": 87,
    "price": 1400,
    "rate": 10
  },
  {
    "id": 1,
    "name": "貓空纜車雙程票",
    "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台北",
    "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    "group": 99,
    "price": 240,
    "rate": 2
  },
  {
    "id": 2,
    "name": "台中谷關溫泉會1日",
    "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台中",
    "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    "group": 20,
    "price": 1765,
    "rate": 7
  }
];

function initialize(tickets) {
  const locationListCards = document.querySelector('.location-list>.container>.cards');
  const searchLabel = document.querySelector('.location-list .search label');
  cardContainers = tickets.map(ticket => createCardContainer(ticket));
  locationListCards.replaceChildren(...cardContainers);
  searchLabel.textContent = `本次搜尋共 ${tickets.length} 筆資料`;
}

function createCardContainer(ticketInfo) {
  const container = document.createElement('div');
  container.classList.add('card-container');
  container.innerHTML = `
    <div class="card">
        <div class="location-flow">${ticketInfo.area}</div>
        <img src="${ticketInfo.imgUrl}" alt="">
        <div class="info">
            <div class="star-flow">${ticketInfo.rate}</div>
            <div class="title">${ticketInfo.name}</div>
            <hr>
            <p>${ticketInfo.description}</p>
            <div class="ticket-info">
                <div class="remaining"><i class="fa-solid fa-circle-exclamation"></i>剩下最後 ${ticketInfo.group} 組</div>
                <div class="price-info">
                    <div class="currency">TWD</div>
                    <div class="price">$${ticketInfo.price.toLocaleString()}</div>
                </div>
            </div>
        </div>
    </div>
  `;
  return container;
}

const noFilter = '全部地區'
filterTickets = area => tickets.filter(ticket => ticket.area == area || area == noFilter)

const searchLocation = document.querySelector('.location-list .search select');
searchLocation.addEventListener('change', e => initialize(filterTickets(e.target.value)));

const ticketForm = document.querySelector('.main .form form');
ticketForm.addEventListener('submit', e => {
  e.preventDefault();
  addFormData(new FormData(e.target));
  searchLocation.value = noFilter;
  searchLocation.dispatchEvent(new Event('change'));
  e.target.reset();
});

function addFormData(formData) {
  console.log(Object.fromEntries(formData));
  let id = tickets.length;
  tickets.push({
    "id": id,
    "name": formData.get('name'),
    "imgUrl": formData.get('imgUrl'),
    "area": formData.get('area'),
    "description": formData.get('description'),
    "group": formData.get('group'),
    "price": formData.get('price'),
    "rate": formData.get('rate')
  });
}

initialize(tickets);

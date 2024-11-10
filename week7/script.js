const travelAPIEndpoint = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json';
let tickets = [];

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

axios.get(travelAPIEndpoint)
  .then(response => response.data.data.forEach(ticket => tickets.push(ticket)))
  .catch(error => console.log(error))
  .finally(() => initialize(tickets));
const travelAPIEndpoint = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json';

const noFilter = '全部地區';

const areaChartId = '#chart';
const areaChartTitle = '套票地區比重';
const areaChartOrders = ['台北', '台中', '高雄'];
const areaChartColors = {
  '台北': '#26BFC7',
  '台中': '#5151D3',
  '高雄': '#E68619'
};

let tickets = [];
let areaChart;

function initialize(tickets) {
  const locationListCards = document.querySelector('.location-list>.container>.cards');
  const searchLabel = document.querySelector('.location-list .search label');
  cardContainers = tickets.map(ticket => createCardContainer(ticket));
  locationListCards.replaceChildren(...cardContainers);
  searchLabel.textContent = `本次搜尋共 ${tickets.length} 筆資料`;
  areaChart = updateAreaChart();
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

function updateAreaChart() {
  let areaData = {};
  let areaCountData = [];
  tickets.forEach(ticket => areaData[ticket.area] ? areaData[ticket.area]++ : areaData[ticket.area] = 1);
  Object.keys(areaData).forEach(area => areaCountData.push([area, areaData[area]]));
  areaCountData = areaCountData.sort((a, b) => areaChartOrders.indexOf(a[0]) - areaChartOrders.indexOf(b[0]));
  return c3.generate({
    bindto: areaChartId,
    data: {
      columns: areaCountData,
      type : 'donut',
      colors: areaChartColors,
    },
    donut: {
      title: areaChartTitle,
      label: {
        show: false
      },
      width: 10
    },
    size: {
      height: 200
    }
  });
}

axios.get(travelAPIEndpoint)
  .then(response => response.data.forEach(ticket => tickets.push(ticket)))
  .catch(error => console.log(error))
  .finally(() => initialize(tickets));
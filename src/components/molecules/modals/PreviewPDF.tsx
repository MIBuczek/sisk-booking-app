import { isEmpty } from 'lodash';
import { IBookedTime, ISummaryClientBookings } from 'models';
import {
  formatDate,
  formatTime,
  modelDisplayValue,
  RECORDS_CLIENTS_DETAILS_PROPERTY_MAP,
  RECORDS_CLIENTS_ROW_DETAILS,
  transformValue
} from 'utils';

export const printPDFReport = (clientSummary: ISummaryClientBookings) => {
  const { client } = clientSummary;
  const new_tab = window.open('', '_blank');

  if (!new_tab) return;

  new_tab.document.write(`
      <html lang="pl">
      <head>
        <meta charset="utf-8" />
        <title>Raport Rezerwacji</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          type="text/css"
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans:400,500,700|Google+Sans+Text:400"
        />
        <link
          type="text/css"
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Google+Sans+Text:400&amp;text=%E2%86%90%E2%86%92%E2%86%91%E2%86%93"
        />
        <style>
          *, *::before, *::after {
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            outline:none
          };
          
          html {
            font-size: 62.5%; 
          };
    
          body {
            margin: 0;
            padding: 0;
            font-size: 1.6rem;
            font-family: 'Oswald', sans-serif;
          };
                    
          .report_wrapper {
              display: block;
              width: 100vw;
              min-height: 100vh;
              position: relative;    
          }
          
          aside {
              position: absolute;
              top: 50px;
              left: 100px;
              display: flex;
              flex-direction: column;
          }
          
          aside > button {
              font-family: 'Oswald', sans-serif;
              font-size: 1rem;
              font-weight: 400;
              border: 1px solid #AFBF36;
              margin: 1rem 0;
              cursor: pointer;
              padding: 8px 14px;
              border-radius: 3px;
              transition: 400ms;
          }
          
          aside .btn-print {
              color: #454545;
              background: #AFBF36;
          }
          
          aside .btn-close {
              color: #454545;
              background: #ccc;
          }
          
          aside .btn-close:hover,
          aside .btn-print:hover{
               box-shadow: 0 0 17px -7px rgba(66, 68, 90, 1);
               opacity: 0.8;
          }
          
          section {
              width: 794px;
              height: fit-content;
              display: block;
              margin: 0 auto;
          }
          
          .client-basic-info {
              width: 100%;
              height: auto;
              display: block;
              padding: 10px 0;
              border-bottom: 1px solid #AFBF36;
              font-family: 'Oswald', sans-serif;
          }
          
          .client-booking-info {
              display: block;
              padding: 10px 0;
          }

          .main-title {
              color: #454545;
              font-family: 'Oswald', sans-serif;
              font-size: 2.4rem;
              font-weight: 400;
              text-transform: uppercase;
              position: relative;
              line-height: 1.5;
              margin: 20px 0 40px 0;
              min-height: 40px;
          }
          
          .main-title::after{
              position: absolute;
              bottom: -14px;
              left: 0;
              content: '';
              border-bottom : 5px solid #AFBF36;
              width: 110px;
          }
          
          .city-details {
              font-family: 'Oswald', sans-serif;
          }
          
          ul {
              width: 100%;
              height: auto;
              list-style: none;
              padding: 0 10px;
              border-top: 1px solid #AFBF36;
              border-bottom: 1px solid #AFBF36;
          }
          
          li {
               font-family: 'Oswald', sans-serif;
               border-top: 1px solid #EEE;
          }
          
          li:first-of-type{
              border: none;
          }
          
          li > p {
              font-size: 14px;
              padding-top: 5px;
          }
          
          li > p > span {
              font-weight: 400;
              margin: 0 4rem 0 0.5rem;
          }
           
           .hidden {
              display: none;
           }
           
           @media print {
             aside {
                display: none;
             }
             
             .report-wrapper{
                margin: 15mm 15mm 15mm 15mm;
             }
             
           }
        </style>
      </head>
      <body>
      <main class="report_wrapper">
        <aside>
            <button type="button" class="btn-print">Wydrukuj Raport</button>
            <button type="button" class="btn-close">Zamknij</button>
        </aside>
        <section>
            <h1 class="main-title">Raport najmów za okres</h1cla>
            <h4 class="period"></h4>
            <div class="client-basic-info"></div>
            <div class="client-booking-info"></div>     
        </section>
      </main>
      </body>
      <script>
          
          const [btn_print] = document.getElementsByClassName('btn-print');
          btn_print.addEventListener('click', (e) => {
            e.preventDefault();
            window.print();
          });
          
          const [btn_close] = document.getElementsByClassName('btn-close')
          btn_close.addEventListener('click',(e)=>{
            e.preventDefault();
            window.close()
          })
          
      </script>
      </html>
    `);

  const [client_basic_info] = new_tab.document.getElementsByClassName('client-basic-info');

  RECORDS_CLIENTS_ROW_DETAILS.forEach((prop) => {
    if (!isEmpty(client[prop])) {
      const paragraph_client = document.createElement('p');
      paragraph_client.innerHTML = `<strong>${
        RECORDS_CLIENTS_DETAILS_PROPERTY_MAP[prop]
      }</strong> : ${modelDisplayValue(prop, client[prop]) || ''}`;

      const wrapper = document.createElement('div');
      wrapper.appendChild(paragraph_client);

      client_basic_info.appendChild(wrapper);
    }
  });

  const generateBookingCityDetails = (
    bookingCityDetails: IBookedTime[],
    html_ul_element: HTMLUListElement
  ) => {
    if (bookingCityDetails.length) {
      bookingCityDetails.forEach(
        ({ day, startHour, endHour, size, building, status, comments }) => {
          const booking_detail_list_item = document.createElement('li');

          const detail_paragraph_one = document.createElement('p');
          detail_paragraph_one.innerHTML = `
          Budynek : <span> ${building}</span> 
          Powierzchnia : <span>${size}</span> 
          Status : <span>${transformValue[status]}</span>
          `;

          const detail_paragraph_two = document.createElement('p');
          detail_paragraph_two.innerHTML = `Dzień : <span>${formatDate(
            day
          )}</span> Godzina rozpoczęcia  : <span>${formatTime(
            startHour
          )}</span>Godzina zakończenia : <span>${formatTime(endHour)}</span>`;

          const detail_paragraph_three = document.createElement('p');
          detail_paragraph_three.innerHTML = `Uwagi : <span class="detail">${comments}</span>`;

          booking_detail_list_item.append(
            detail_paragraph_one,
            detail_paragraph_two,
            detail_paragraph_three
          );

          html_ul_element.appendChild(booking_detail_list_item);
        }
      );
    } else {
      html_ul_element.classList.add('hidden');
    }
  };

  const [client_booking_info] = new_tab.document.getElementsByClassName('client-booking-info');

  const paragraph_citi_radwanice = document.createElement('p');
  paragraph_citi_radwanice.classList.add('city-details');
  const booking_detail_list_radwanice = document.createElement('ul');
  paragraph_citi_radwanice.innerHTML = `<strong>Radwanice</strong> : ${clientSummary.radwanice.length} rezerwacji.`;
  generateBookingCityDetails(clientSummary.radwanice, booking_detail_list_radwanice);

  const paragraph_citi_siechnice = document.createElement('p');
  paragraph_citi_siechnice.classList.add('city-details');
  const booking_detail_list_siechnice = document.createElement('ul');
  paragraph_citi_siechnice.innerHTML = `<strong>Siechnice</strong> : ${clientSummary.siechnice.length} rezerwacji.`;
  generateBookingCityDetails(clientSummary.siechnice, booking_detail_list_siechnice);

  const paragraph_citi_katarzyna = document.createElement('p');
  paragraph_citi_katarzyna.classList.add('city-details');
  const booking_detail_list_katarzyna = document.createElement('ul');
  paragraph_citi_katarzyna.innerHTML = `<strong>Święta Katarzyna</strong> : ${clientSummary['swieta-katarzyna'].length} rezerwacji.`;
  generateBookingCityDetails(clientSummary['swieta-katarzyna'], booking_detail_list_katarzyna);

  const paragraph_citi_zerniki = document.createElement('p');
  paragraph_citi_zerniki.classList.add('city-details');
  const booking_detail_list_zerniki = document.createElement('ul');
  paragraph_citi_zerniki.innerHTML = `<strong>Żerniki Wrocławskie</strong> : ${clientSummary['zerniki-wroclawskie'].length} rezerwacji.`;
  generateBookingCityDetails(clientSummary['zerniki-wroclawskie'], booking_detail_list_zerniki);

  client_booking_info.append(
    paragraph_citi_radwanice,
    booking_detail_list_radwanice,
    paragraph_citi_siechnice,
    booking_detail_list_siechnice,
    paragraph_citi_katarzyna,
    booking_detail_list_katarzyna,
    paragraph_citi_zerniki,
    booking_detail_list_zerniki
  );
};

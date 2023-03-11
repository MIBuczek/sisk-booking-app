import { isEmpty } from 'lodash';
import { IBookedTime, ISummaryClientBookings } from 'models';
import {
  checkSelectedOption,
  formatDate,
  formatTime,
  modelDisplayValue,
  RECORDS_CLIENTS_DETAILS_PROPERTY_MAP,
  RECORDS_CLIENTS_ROW_DETAILS,
  summaryTotalBookingsNumber,
  transformValue
} from 'utils';

export const printPDFReport = (clientSummary: ISummaryClientBookings) => {
  const { client } = clientSummary;
  const new_tab = window.open('https://sisk-booking-app.web.app/#/raport-najmów', '_blank');

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
          
          .general-detail-info {
              display: grid;
              grid-template-columns: 1fr;
              font-family: 'Oswald', sans-serif;
              font-size: 14px;
              background: #eaeaea;
              padding: 0.5rem;
              border: 1px solid #AFBF36;
              border-bottom: none;
          }
          
          .general-detail-info > p {
            margin: 0;
            line-height: 2rem;
          }

          .general-detail-info > ul {
            border: 1px dotted #AFBF36;
            border-left: none;
            border-right: none;
          }
          
         .general-detail-info > ul > li {
            padding: 5px 0;
          }
          
          .general-detail-info > ul > li > p > span {
            margin: 0.5rem 3rem 0 0.5rem;
          }
          
          .general-detail-info > p > span {
            display: inline-block;
            margin: 0 3.5rem 0 .5rem;
            word-break: break-word;
            line-height: 1.2rem;
          }
        
          .general-detail-info > p:last-of-type > span {
            display: initial;
            margin: 0;
          }
        
          ul {
              width: 100%;
              height: auto;
              list-style: none;
              padding: 0 10px;
              border: 1px solid #AFBF36;
              margin-top: 0;
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
          }
          
          li > p:first-of-type{
          margin-bottom: 0;
          }
          
          li > p:last-of-type{
          margin-top: 0;
          }
          
          li > p > span {
              display: inline-block;
              font-weight: 400;
              margin: 0.5rem 5rem 0 0.5rem;
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
      paragraph_client.innerHTML = `
      <strong>${RECORDS_CLIENTS_DETAILS_PROPERTY_MAP[prop]}</strong> : ${
  modelDisplayValue(prop, client[prop]) || ''
}`;

      const wrapper = document.createElement('div');
      wrapper.appendChild(paragraph_client);

      client_basic_info.appendChild(wrapper);
    }
  });

  const generateBookingCityDetails = (
    bookingCityDetails: IBookedTime[],
    html_wrapper_element: HTMLDivElement
  ) => {
    if (bookingCityDetails.length) {
      bookingCityDetails.forEach(({ generalBookingDetails, bookingTimeDetails }) => {
        const {
          payment,
          selectedOptions,
          extraOptions,
          message,
          size,
          building,
          discount = ''
        } = generalBookingDetails;

        const selected_option_list = document.createElement('ul');

        if (extraOptions) {
          selectedOptions.forEach(({ options, fromHour, toHour }) => {
            const selected_option_list_item = document.createElement('li');
            selected_option_list_item.innerHTML = `<p>
                Wybrana opcja : <span>${checkSelectedOption(options)}</span>
                Od godziny : <span>${formatTime(fromHour)}</span>
                Do godziny : <span>${formatTime(toHour)}</span>
                </p>`;
            selected_option_list.append(selected_option_list_item);
          });
        } else {
          selected_option_list.classList.add('hidden');
        }

        const booking_general_details_wrapper = document.createElement('div');
        booking_general_details_wrapper.classList.add('general-detail-info');

        booking_general_details_wrapper.innerHTML = `
                <p>
                Budynek : <span>${transformValue[building]}</span>
                Wynajmowana powierzchnia : <span>${size}</span> 
                Udzielony rabat : <span>${discount || '0%'}</span><br>
                Metoda płatności : <span>${transformValue[payment]}</span>
                Dodatkowe Opcje : <span>${extraOptions ? 'Tak' : 'Nie'}</span>
                </p>
                <p>
                Dodatkowe informacje : <span class="comments">
                ${message.length ? message : '[Brak]'}</span>
                </p>`;

        booking_general_details_wrapper.append(selected_option_list);

        const booking_time_detail_list = document.createElement('ul');

        bookingTimeDetails.forEach(
          ({ day, startHour, endHour, status, participants = '', comments }) => {
            const booking_detail_list_item = document.createElement('li');
            const detail_paragraph_one = document.createElement('p');
            const detail_paragraph_two = document.createElement('p');

            detail_paragraph_one.innerHTML = `
                 Dzień : <span>${formatDate(day)}</span>
                 Godzina rozpoczęcia : <span>${formatTime(startHour)}</span>
                 Godzina zakończenia : <span>${formatTime(endHour)}</span>
                 Liczba uczestników : <span>${participants || '[Brak]'}</span>
                 Status : <span>${transformValue[status]}</span>
                 `;

            detail_paragraph_two.innerHTML = `Uwagi :
            <span class="comments">
            ${comments.length ? comments : '[Brak]'}
            </span>`;

            booking_detail_list_item.append(detail_paragraph_one, detail_paragraph_two);
            booking_time_detail_list.appendChild(booking_detail_list_item);
          }
        );

        html_wrapper_element.append(booking_general_details_wrapper, booking_time_detail_list);
      });
    } else {
      html_wrapper_element.classList.add('hidden');
    }
  };

  const [client_booking_info] = new_tab.document.getElementsByClassName('client-booking-info');

  const paragraph_citi_radwanice = document.createElement('p');
  paragraph_citi_radwanice.classList.add('city-details');
  const booking_detail_wrapper_radwanice = document.createElement('div');
  paragraph_citi_radwanice.innerHTML = `<strong>Radwanice</strong> : ${summaryTotalBookingsNumber(
    clientSummary.radwanice
  )}`;
  generateBookingCityDetails(clientSummary.radwanice, booking_detail_wrapper_radwanice);

  const paragraph_citi_siechnice = document.createElement('p');
  paragraph_citi_siechnice.classList.add('city-details');
  const booking_detail_wrapper_siechnice = document.createElement('div');
  paragraph_citi_siechnice.innerHTML = `<strong>Siechnice</strong> : ${summaryTotalBookingsNumber(
    clientSummary.siechnice
  )}`;
  generateBookingCityDetails(clientSummary.siechnice, booking_detail_wrapper_siechnice);

  const paragraph_citi_katarzyna = document.createElement('p');
  paragraph_citi_katarzyna.classList.add('city-details');
  const booking_detail_wrapper_katarzyna = document.createElement('div');
  paragraph_citi_katarzyna.innerHTML = `<strong>Święta Katarzyna</strong> : ${summaryTotalBookingsNumber(
    clientSummary['swieta-katarzyna']
  )}`;
  generateBookingCityDetails(clientSummary['swieta-katarzyna'], booking_detail_wrapper_katarzyna);

  const paragraph_citi_zerniki = document.createElement('p');
  paragraph_citi_zerniki.classList.add('city-details');
  const booking_detail_wrapper_zerniki = document.createElement('div');
  paragraph_citi_zerniki.innerHTML = `<strong>Żerniki Wrocławskie</strong> : ${summaryTotalBookingsNumber(
    clientSummary['zerniki-wroclawskie']
  )}`;
  generateBookingCityDetails(clientSummary['zerniki-wroclawskie'], booking_detail_wrapper_zerniki);

  client_booking_info.append(
    paragraph_citi_radwanice,
    booking_detail_wrapper_radwanice,
    paragraph_citi_siechnice,
    booking_detail_wrapper_siechnice,
    paragraph_citi_katarzyna,
    booking_detail_wrapper_katarzyna,
    paragraph_citi_zerniki,
    booking_detail_wrapper_zerniki
  );
};

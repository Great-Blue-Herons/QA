import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    {duration: '10s', target: 500}, //below normal load
    {duration: '10s', target: 1000},
    {duration: '1m', target: 1400},
    {duration: '10s', target: 100},
    {duration: '10s', target: 0}
  ],
};

export default function () {
  let product_id = Math.floor((Math.random() * (100 - 90 + 1) + 90)/100 * 1000011);
  http.get(`http://localhost:3000/qa/questions?product_id=${product_id}`);
};

// export default function () {
//   let question_id = Math.floor((Math.random() * (100 - 90 + 1) + 90)/100 * 3518972);
//   http.get(`http://localhost:3000/qa/questions/${question_id}/answers`);
// };




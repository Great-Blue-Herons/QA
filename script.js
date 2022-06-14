import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    // {duration: '10s', target: 10}, //below normal load
    {duration: '10s', target: 200},
    {duration: '10s', target: 1000},
    {duration: '10s', target: 2000},
    {duration: '10s', target: 200},
    {duration: '10s', target: 0}
  ],
};

// GET QUESTIONS

// export default function () {
//   let product_id = Math.floor((Math.random() * (100 - 90 + 1) + 90)/100 * 1000011);
//   const res = http.get(`http://localhost:3000/qa/questions?product_id=${product_id}`);
//   check(res, {
//     'is status 200': (r) => r.status === 200,
//   });

// };

// GET ANSWERS

// export default function () {
//   let question_id = Math.floor((Math.random() * (100 - 90 + 1) + 90)/100 * 3518972);
//   const res = http.get(`http://localhost:3000/qa/questions/${question_id}/answers`);

//   check(res, {
//     'is status 200': (r) => r.status === 200,
//   });
// };

//PUT QUESTION HELPFUL

// export default function () {
//   let question_id = Math.floor((Math.random() * (100 - 90 + 1) + 90)/100 * 3518972);
//   const res = http.put(`http://localhost:3000/qa/questions/${question_id}/helpful`);
//   check(res, {
//     'is status 204': (r) => r.status === 204,
//   });

// };

//PUT ANSWER HELPFUL

export default function () {
  let answer_id = Math.floor((Math.random() * (100 - 90 + 1) + 90)/100 * 6879316);
  const res = http.put(`http://localhost:3000/qa/answers/${answer_id}/helpful`);
  check(res, {
    'is status 204': (r) => r.status === 204,
  });

};



# QA

QA is a question and answers service that supports both a parallel server and a relational database

QA suports the following queries:

- All questions/answers for a given product id
- All questions/answers made by a user
- All answers for a question
- Keyword search
- Reporting questions/answers
- Voting questions/answers as helpful
- Media upload
- Sorting by relevancy, helpfulness, newest


## Installation and Development

### Pre Instillation Requirments
```
node v16.15.0
npm v8.5.5
```
## Environment Variables

QA uses [dotenv](https://www.npmjs.com/package/dotenv)

Update the Port and Auth variables in the `example.env`file found in the main directory. Make sure the AUTH variable is updated with your GITHUB token. When variables are updated remove example from the name and save the file as `.env`

## Installation and Setup

From the root directory, run the following installation and setup commands in your terminal
1. Install dependencies"
  ```
  npm install
  ```
2. Start Development Server:
  ```
  npm run server-dev
  ```
3. Start PostgreSQL Terminal
  ```
  brew services start postgresql
  psql postgres
  ```

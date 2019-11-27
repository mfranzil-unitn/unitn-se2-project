let reviews = [];

async function write(review) {
  //Aggiunta della review
  var readline = require('readline');


  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const questionTitle = () => {
    return new Promise((resolve, reject) => {
      rl.question('Title: ', (title) =>{
        console.log(`Titolone: ${title}`);
        review.title = title;
        resolve();
      })
    })
  }

  const questionLineId = () => {
    return new Promise((resolve, reject) => {
      rl.question('Lineid: ', (lineid) =>{
        console.log(`LINEID: ${lineid}`);
        review.lineid = lineid;
        resolve();
      })
    })
  }

  const questionText = () => {
    return new Promise((resolve, reject) => {
      rl.question('Text: ', (text) =>{
        console.log(`Text: ${text}`);
        review.text= text;
        resolve();
      })
    })
  }

  const main = async () => {
    await questionTitle()
    await questionLineId()
    await questionText()
    rl.close();
  }

  main();
  reviews.push(review);
}

// eslint-disable-next-line no-unused-vars
async function read(review) {
  //
  return reviews;
}

module.exports = {
  write,
  read
};

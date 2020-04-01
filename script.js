const API_URL = "https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty";
const itemIDs = [];
const items = [];
const container = document.getElementById('inner-container');



function getItemIDs (){
     fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                itemIDs.push(data[i]);
            }    
            getItems(itemIDs);                    
    })

}
function getItems(array){
    for (let i = 0; i < array.length; i++) {
        const itemID = itemIDs[i];
        fetch(`https://hacker-news.firebaseio.com/v0/item/${itemID}.json?print=pretty`)
            .then((res) => res.json())
            .then((data) => {
                const item = {
                    "by" : data.by,
                    "descendants" : data.descendants,
                    "id" : data.id,
                    "kids" : data.kids,
                    "score" : data.score,
                    "time" : data.time,
                    "title" : data.title,
                    "type" : data.type,
                    "url" : data.url
                }
                createElement(item);
                items.push(item);
            })        
    }
}
function createElement(item){
    const storyElement = document.createElement('div');
    storyElement.classList.add('Story-Element');

    const rowElement = document.createElement('div');
    rowElement.classList.add('Story-Row');

    const voteElement = document.createElement('p');
    voteElement.classList.add('Story-Vote');
    voteElement.innerText = item.score + " Votes";

    const timeElement = document.createElement('p');
    timeElement.classList.add('Story-Time');
    const time = moment(item.time * 1000).fromNow();
    timeElement.innerText = time;

    const titleElement = document.createElement('h3');
    titleElement.classList.add('Story-Title');
    titleElement.innerText = item.title;

    const linkElement = document.createElement('a');
    linkElement.classList.add('Story-Link');
    linkElement.href = item.url;
    linkElement.innerText = "LINK"

    storyElement.appendChild(rowElement);
    rowElement.appendChild(voteElement);
    rowElement.appendChild(timeElement);
    storyElement.appendChild(titleElement);
    storyElement.appendChild(linkElement);

    container.appendChild(storyElement);
}   
getItemIDs();


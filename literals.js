var customer = { name: "Foo" }
var card = { amount: 7, product: "Bar", unitprice: 42 }
var message = `Hello ${customer.name},
want to buy ${card.amount} ${card.product} for
a total of ${card.amount * card.unitprice} bucks?`

console.log(message);

// Function
var cat = 'Con mèo';
function catWork() { return 'trèo cây cau!?'; }
console.log(`${cat} đang ${catWork()}`);
// Other funciton
var cat = {
    name: 'Móm',
    work: function() {
        return 'trèo cây cau!?';
    }
};
console.log(`${cat.name.toUpperCase()} đang ${cat.work()}`);

//html template
var cat = {
    name: 'Mun',
    job: 'Hái cau',
    bio: 'Chơi là chính, ngủ là chủ yếu, việc thì bỏ bê',
    rating: 1,
    voice: function () {
        return 'mimi mimi';
    },
    tags: ['màu trắng', 'lùn', 'hơi nhác'],
};

var markup = `
    <div class="cat">
        <h2>${cat.name}</h2>
        <p class="job">${cat.job}</p>
        <p class="bio">${cat.bio}</p>
        <p class="star">${cat.rating}*</p>
        <p class="voice">${cat.voice()}</p>
        <p class="tags">
            ${cat.tags.map(tag => ` <span>${tag}</span>`)}
        </p>
    </div>
`;
document.body.innerHTML = markup;
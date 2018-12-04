var initialCats = [
    {
        name: 'Tabby',
        imgSrc: 'img/434164568_fea0ad4013_z.jpg',
        clickCount: 0,
        nicknames: ['Tabtab', 'T-Bone', 'Mr. T', 'Tabitha Tab Tabby Catty Cat']
    },
    {
        name: 'Tiger',
        imgSrc: 'img/22252709_010df3379e_z.jpg',
        clickCount: 0,
        nicknames: ['Tigger']
    },
    {
        name: 'Scaredy',
        imgSrc: 'img/1413379559_412a540d29_z.jpg',
        clickCount: 0,
        nicknames: ['Casper']
    },
    {
        name: 'Shadow',
        imgSrc: 'img/4154543904_6e2428c421_z.jpg',
        clickCount: 0,
        nicknames: ['Shooby']
    },
    {
        name: 'Sleepy',
        imgSrc: 'img/9648464288_2516b35537_z.jpg',
        clickCount: 0,
        nicknames: ['Zzzzz']
    }
];

var Cat = function(data) {
    this.name = ko.observable(data.name);
    this.clickCount = ko.observable(data.clickCount);
    this.imgSrc = ko.observable(data.imgSrc);
    this.imgAttribution = ko.observable(data.imgAttribution);

    this.nicknames = ko.observableArray(data.nicknames);

    this.title = ko.computed(function() {
        var level;
        var clicks = this.clickCount();
        switch (true) {
            case (clicks >= 0 && clicks < 2):
                level = 'Newborn';
                break;
            case (clicks >= 2 && clicks < 6):
                level = 'Infant';
                break;
            case (clicks >= 6 && clicks < 10):
                level = 'Toddler';
                break;
            case (clicks >= 10 && clicks < 14):
                level = 'Child';
                break;
            case (clicks >= 14 && clicks < 18):
                level = 'Teen';
                break;
            case (clicks >= 18 && clicks < 25):
                level = 'Adult';
                break;
            case (clicks >= 25 && clicks < 29):
                level = 'Dying';
                break;
            case (clicks >= 29):
                return 'Immortal';
        }
        return level;
    }, this);
};

var ViewModel = function() {
    var self = this; // Defining trick! it can also be var that = this; it can help us keep a pointer of accessing the ViewModel.

    this.catList = ko.observableArray([]);
    initialCats.forEach(function(catItem) {
        self.catList.push(new Cat(catItem));
    });
    this.currentCat = ko.observable(self.catList()[0]);

    this.setCat = function(clickedCat) {
        self.currentCat(clickedCat);
    };

    this.incrementCounter = function() {
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);
        // this.clickCount(this.clickCount() + 1);
        // The 'this' here represents the 'with' binding context, which is the currentCat. Thus there is no need to write currentCat() again.
    };
};

ko.applyBindings(new ViewModel());
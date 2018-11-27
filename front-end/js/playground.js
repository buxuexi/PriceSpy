
var root = "https://pricespy-297.herokuapp.com/product/"
// var root = "http://127.0.0.1:5000/product/"

var hot = [
    {
        "URL": "https://www.amazon.com/Dyson-Motorhead-Cordless-Manufacturers-Warranty/dp/B07KCMN397/ref=sr_1_24/143-3756742-6713914?s=vacuums&ie=UTF8&qid=1543273138&sr=1-24&keywords=dyson",
        "TITLE": "Dyson V7 Motorhead Cordless Vacuum Cleaner + Manufacturer's Warranty + Mattress Tool Bundle",
        "PRICE": "$299.00",
        "IMAGE": "https://images-na.ssl-images-amazon.com/images/I/41F4vzMCVhL._AC_US160_.jpg",
        "SOURCE": "Amazon"
    },
    {
        "URL": "https://www.amazon.com/Nespresso-Vertuoline-Seller-Assortment-Count/dp/B01N05APQY/ref=sr_1_8_a_it/137-2632536-6210737?ie=UTF8&qid=1543273219&sr=8-8&keywords=nespresso",
        "TITLE": "Nespresso Vertuoline Best Seller Assortment, 10 Count (Pack of 3)",
        "PRICE": "$36.00",
        "IMAGE": "https://images-na.ssl-images-amazon.com/images/I/41Kw0kdp9PL._AC_US218_.jpg",
        "SOURCE": "Amazon"
    },
    {
        "URL": "https://www.ebay.com/itm/Clarks-Mens-Bowman-Top-Duck-Boot/223127692306?hash=item33f3726412:m:mP-RJc0-M8aUK1bKqKyERfg",
        "TITLE": "Clarks Men's Bowman Top Duck Boot",
        "PRICE": "$73.50",
        "IMAGE": "https://i.ebayimg.com/thumbs/images/m/mP-RJc0-M8aUK1bKqKyERfg/s-l225.jpg",
        "SOURCE": "eBay"
    },
    {
        "URL": "https://www.amazon.com/Nintendo-Switch-Mario-Kart-Deluxe/dp/B07JJLLFXJ/ref=sr_1_3/139-6479809-9012541?ie=UTF8&qid=1543273344&sr=8-3&keywords=switch",
        "TITLE": "Nintendo Switch w/ Mario Kart 8 Deluxe",
        "PRICE": "$444.99",
        "IMAGE": "https://images-na.ssl-images-amazon.com/images/I/51-INJ+6AOL._AC_US218_.jpg",
        "SOURCE": "Amazon"
    },
    {
        "URL": "https://www.ebay.com/itm/Delonghi-Nespresso-EN550S-Lattissima-Touch-Coffee-Latte-Cappuccino-Maker/253997961148?epid=224870098&hash=item3b23754fbc:g:YvAAAOSwc1FXYXEb",
        "TITLE": "Delonghi Nespresso EN550S Lattissima Touch Coffee Latte Cappuccino Maker",
        "PRICE": "$179.99",
        "IMAGE": "https://i.ebayimg.com/thumbs/images/g/YvAAAOSwc1FXYXEb/s-l225.jpg",
        "SOURCE": "eBay"
    },
    {
        "URL": "https://www.ebay.com/itm/Fujifilm-Instax-Mini-70-Green-Instant-Film-Camera-Bundle-Free-10-Rainbow-Films/323312356924?epid=245348488&hash=item4b46eb0e3c:g:PwMAAOSwrU1bLB8Z",
        "TITLE": "Fujifilm Instax Mini 70 Green Instant Film Camera Bundle Free 10 Rainbow Films",
        "PRICE": "$58.99",
        "IMAGE": "https://i.ebayimg.com/thumbs/images/g/PwMAAOSwrU1bLB8Z/s-l225.jpg",
        "SOURCE": "eBay"
    },
    {
        "URL": "https://www.amazon.com/Bose-SoundTouch-wireless-speaker-works/dp/B011IKGT46/ref=sr_1_23/130-5515815-2370159?s=electronics&ie=UTF8&qid=1543273433&sr=1-23&keywords=Bose",
        "TITLE": "Bose SoundTouch 30 wireless speaker, works with Alexa, Black - 738102-1100",
        "PRICE": "$499.00",
        "IMAGE": "https://images-na.ssl-images-amazon.com/images/I/519CFBz28VL._AC_US218_.jpg https://images-na.ssl-images-amazon.com/images/I/41LCPH8SF9L._AC_AA80_QL65_.jpg",
        "SOURCE": "Amazon"
    },
]

$(document).ready(function(){
    var product_list = hot
    for(var i = 0; i < product_list.length; i++){
        console.log(product_list[i].IMAGE)
        $("#products").append('<li class="item"><div class="image-wrapper"><a title=' + product_list[i].TITLE + ' href='+ product_list[i].URL + ' target="_blank"><img src='+ product_list[i].IMAGE + ' alt='+ product_list[i].TITLE+'></a></div><div class="content-wrapper"><div class="content-ctn"><a title='+ product_list[i].TITLE+' class="content-title">'+ product_list[i].TITLE+'</a><div class="content-yuan">'+ product_list[i].PRICE+'</div></div><div class="content-from"><span class="content-from-site">'+ product_list[i].SOURCE +'</span><a title='+ product_list[i].TITLE+' href='+ product_list[i].URL + ' class="content-buy" target="_blank">Buy it</a></div></div></li>');
    }
});

$(document).ready(function(){
    $(".search-btn").click(function(){
        // $("#products").empty()
        var product_name = $("#product_name").val()
        var url = root + product_name
        $.getJSON(url,function(data){
            var product_list = data
            $("#products").empty()
            for(var i = 0; i < product_list.length; i++){
                console.log(product_list[i].IMAGE)
                $("#products").append('<li class="item"><div class="image-wrapper"><a title=' + product_list[i].TITLE + ' href='+ product_list[i].URL + ' target="_blank"><img src='+ product_list[i].IMAGE + ' alt='+ product_list[i].TITLE+'></a></div><div class="content-wrapper"><div class="content-ctn"><a title='+ product_list[i].TITLE+' class="content-title">'+ product_list[i].TITLE+'</a><div class="content-yuan">'+ product_list[i].PRICE+'</div></div><div class="content-from"><span class="content-from-site">'+ product_list[i].SOURCE +'</span><a title='+ product_list[i].TITLE+' href='+ product_list[i].URL + ' class="content-buy" target="_blank">Buy it</a></div></div></li>');
            }
        });
    });
});
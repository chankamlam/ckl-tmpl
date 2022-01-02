const { expect } = require("@jest/globals");
const te = require("../lib/index")
describe("Test template engine", () => {
    test("template engine init normaly", () => {
        expect(te).toHaveProperty("config")
        expect(te).toHaveProperty("render")
    });
    test("template engine config normaly", () => {
        expect(te.config({})).toBeTruthy
    })
    test("template engine render normaly", () => {
        var tmpl = `<div>
My name is <%=name%> and i am <%=age%> years old.
I live in <%=contact.address%> and <%my phone number is <%=contact.phone%>.
My favorite coins are:
<ul>
<% coins.forEach(function(item){ %>
    <li><%= item %></li>
<% }); %>
</ul>
</div>`
        var data = {
            name: "ckl",
            age: 18,
            contact: {
                address: "xxxxxxxx",
                phone: 888
            },
            coins: ["ETH", "BTC"]
        }
        const res = te.render(tmpl,data)
        expect(res).toEqual("<div> My name is ckl and i am 18 years old. I live in xxxxxxxx and <%my phone number is 888. My favorite coins are: <ul>      <li>ETH</li>      <li>BTC</li>  </ul> </div>")
    })
});
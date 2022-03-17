import React from 'react';
import OrderForm from './order_form';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

var items = [
    {
      "item_uuid": "item1-uuid",
      "item_name": "Apple Pie",
      "item_description": "It is generally double-crusted, with pastry both above and below the filling; the upper crust may be solid or latticed (woven of crosswise strips).",
      "price": 25.0
    },
    {
      "item_uuid": "item2-uuid",
      "item_name": "Chicken Pot Pie",
      "item_description": "A delicious chicken pot pie made from scratch with carrots, peas, and celery for a comfort food classic.",
      "price": 42.0
    },
    {
      "item_uuid": "item3-uuid",
      "item_name": "Bagel",
      "item_description": "Shaped by hand into the form of a ring from yeasted wheat dough, roughly hand-sized, that is first boiled for a short time in water and then baked.",
      "price": 27.0
    },
    {
      "item_uuid": "item4-uuid",
      "item_name": "Pumpkin Pie",
      "item_description": "The pie's filling ranges in color from orange to brown and is baked in a single pie shell, rarely with a top crust.",
      "price": 30.0
    }
  ]


const baseProps = {items : items};

Enzyme.configure({ adapter: new Adapter() });
const wrapper = mount(<OrderForm {...baseProps} />).instance();


describe("OrderForm initialization and rendering", () => {
    test('OrderForm initialization', () => {
        expect(wrapper.getCart().size).toBe(0);
        expect(wrapper.getUser().size).toBe(0);
    });
});

describe("Update tests", () => {
    test('Add items and compare cart', () => {
        wrapper.updateItem({uuid: "item1-uuid", quantity : 1});
        wrapper.updateItem({uuid: "item2-uuid", quantity : 1});
        wrapper.updateItem({uuid: "item1-uuid", quantity : 2});
        wrapper.updateItem({uuid: "item3-uuid", quantity : 0});

        expect(wrapper.getCart().size).toBe(2);
        expect(wrapper.getCart().get("item1-uuid")).toBe(2);
        expect(wrapper.getCart().get("item2-uuid")).toBe(1);
    });

    test('Update user infromation and update user', () => {
        wrapper.updateUser("first-name", "Lai");
        wrapper.updateUser("last-name", "Brian");
        wrapper.updateUser("email", "brianlai@test.com");
        wrapper.updateUser("mobile", "123456789");

        expect(wrapper.getUser().size).toBe(4);
        expect(wrapper.getUser().get("first-name")).toBe("Lai");
        expect(wrapper.getUser().get("mobile")).toBe("123456789");
    });

    test('Form validation', () => {
        wrapper.updateUser("first-name", "Lai123");
        expect(wrapper.validateForm()).toBe(false);

        wrapper.updateUser("last-name", "Lai");

        wrapper.updateUser("email", "Lai123");
        expect(wrapper.validateForm()).toBe(false);
        wrapper.updateUser("email", "brianlai@test.com");

        wrapper.updateUser("mobile", "Lai123");
        expect(wrapper.validateForm()).toBe(false);
        wrapper.updateUser("mobile", "123456789");

    });

    test('Order calculation', () => {
        expect(wrapper.calculateTotalAmount(items)).toBe(92);
    });


    test('Convert purchase', () => {
        var session = { session: "206eea19-2680-44a1-b85a-427daa3c631d",
                        jwt_token: "764ca944-1656-4465-8d89-06af91c62d01"
                      }
        var header = wrapper.convertPurchase(session);
        expect(header["Session"]).toBe(session.session);
        expect(header["Authorization"].length > 7).toBe(true);
    });
})
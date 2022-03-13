USE ORDERS;

INSERT INTO ITEM (ITEM_UUID, ITEM_NAME, ITEM_DESCRIPTION, PRICE, CREATION_EPOCH_TIME)
VALUES ('b68a00bb-a1de-45dd-800a-72acdfdc0bbc', 'Pumpkin Pie', "The pie's filling ranges in color from orange to brown and is baked in a single pie shell, rarely with a top crust.", 30, UNIX_TIMESTAMP()); 
INSERT INTO ITEM (ITEM_UUID, ITEM_NAME, ITEM_DESCRIPTION, PRICE, CREATION_EPOCH_TIME)
VALUES ('31082d44-ef74-4a9a-b04e-62f7b4f0b9e1', 'Chicken Pot Pie', "A delicious chicken pot pie made from scratch with carrots, peas, and celery for a comfort food classic.", 42, UNIX_TIMESTAMP()); 
INSERT INTO ITEM (ITEM_UUID, ITEM_NAME, ITEM_DESCRIPTION, PRICE, CREATION_EPOCH_TIME)
VALUES ('2935f354-d527-4689-b624-e014622577eb', 'Apple Pie', "It is generally double-crusted, with pastry both above and below the filling; the upper crust may be solid or latticed (woven of crosswise strips).", 25, UNIX_TIMESTAMP()); 
INSERT INTO ITEM (ITEM_UUID, ITEM_NAME, ITEM_DESCRIPTION, PRICE, CREATION_EPOCH_TIME)
VALUES ('968adbb9-56df-4056-9ffe-5ce787cce659', 'Bagel', "Shaped by hand into the form of a ring from yeasted wheat dough, roughly hand-sized, that is first boiled for a short time in water and then baked.", 27, UNIX_TIMESTAMP()); 

commit;
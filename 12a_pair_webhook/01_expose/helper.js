export function validationOfRegister(input) {
    const eventTypes = [
        "payment_received",
        "payment_processed",
        "invoice_processing",
        "invoice_completed",
    ];

    try {
        let data = JSON.parse(JSON.stringify(input));

        let correctUrlKey = data.webhook_url ? true : false;
        let correctEventKey = data.events ? true : false;
        let correctEventValue = data.events.some(item => eventTypes.includes(item));

        if (correctUrlKey && correctEventKey && correctEventValue)
            return true;
        else
            return false;

    } catch (err) {
        console.log("error in validation");
        console.log("err:", err);

        return false;
    }
}

export function validationOfUnregister(input, ListOfRegisteredWebhooks) {
    const eventTypes = [
        "payment_received",
        "payment_processed",
        "invoice_processing",
        "invoice_completed",
    ];

    try {
        let data = JSON.parse(JSON.stringify(input));

        let correctEventKey = data.events ? true : false;
        let correctEventValue = data.events.some(item => eventTypes.includes(item));
        let correctIdKey = data.id ? true : false;

        let gotMyId = false;

        for (const key in ListOfRegisteredWebhooks) {
            let myId = ListOfRegisteredWebhooks[key].some(item => item.id == data.id);

            // if any of the event lists contains this id, set it true
            if(myId == true)
            {
                gotMyId = true;
            }
        }

        if (correctEventKey && correctEventValue && correctIdKey && gotMyId)
            return true;
        else
            return false;

    } catch (err) {
        console.log("error in validation");
        console.log("err:", err);

        return false;
    }
}
import fs from "fs";

const FILE =
"./data/ticketActivity.json";

export function updateTicketActivity(
    channelId
) {

    let data = {};

    if (
        fs.existsSync(FILE)
    ) {

        data =
            JSON.parse(
                fs.readFileSync(FILE)
            );

    }

    data[channelId] =
        Date.now();

    fs.writeFileSync(
        FILE,
        JSON.stringify(
            data,
            null,
            2
        )
    );

}

export function getInactiveTickets() {

    if (
        !fs.existsSync(FILE)
    ) return [];

    const data =
        JSON.parse(
            fs.readFileSync(FILE)
        );

    const result = [];

    for (
        const channelId
        in data
    ) {

        const diff =
            Date.now()
            - data[channelId];

        if (
            diff >
            24 * 60 * 60 * 1000
        ) {

            result.push(
                channelId
            );

        }

    }

    return result;

}
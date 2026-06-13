import fs from "fs";

const FILE =
"./data/staffActivity.json";

export function updateStaffActivity(ticketId) {

    let data = {};

    if (fs.existsSync(FILE)) {

        data = JSON.parse(
            fs.readFileSync(FILE)
        );

    }

    data[ticketId] = Date.now();

    fs.writeFileSync(
        FILE,
        JSON.stringify(
            data,
            null,
            2
        )
    );

}

export function canAIReply(ticketId) {

    let data = {};

    if (fs.existsSync(FILE)) {

        data = JSON.parse(
            fs.readFileSync(FILE)
        );

    }

    const lastReply =
        data[ticketId];

    if (!lastReply)
        return true;

    const diff =
        Date.now() -
        lastReply;

    return (
        diff >
        10 * 60 * 1000
    );
}
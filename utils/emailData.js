import nextBase64 from 'next-base64';

export default function emailData(parts, array) {
    const monthMap = {
        sty: '01',
        lut: '02',
        mar: '03',
        kwi: '04',
        maj: '05',
        cze: '06',
        lip: '07',
        sie: '08',
        wrz: '09',
        paź: '10',
        lis: '11',
        gru: '12'
    };  

    for (let part of parts) {
        if (part.mimeType === "text/plain") {
            let data = part.body.data;
            let text = nextBase64.decode(data);
            let lines = text.split('\n');

            let searchStringFoName = "Aplikacja:";
            let matchingLinesForName = lines.filter(line => line.includes(searchStringFoName)).filter(line => line.includes("treści:"));

            let searchStringForBillingInfo = "Cena subskrypcji:";
            let matchingLinesForBillingInfo = lines.filter(line => line.includes(searchStringForBillingInfo)).filter(line => line.includes("za"));

            if (matchingLinesForName.length > 0 && matchingLinesForBillingInfo.length > 0) {
                let matchForName = matchingLinesForName[0].match(/Aplikacja:(.*)-/);
                let matchForPrice = matchingLinesForBillingInfo[0].match(/Cena subskrypcji:(.*)zł/);
                let matchForStartDate = matchingLinesForBillingInfo[0].match(/początek:(.*)/);
                let matchForRenewPeriod = matchingLinesForBillingInfo[0].match(/za (.*), po/);

                let name = matchForName[1].trim();
                let price = matchForPrice[1].trim();
                let startDateBeforeFormating = matchForStartDate[1].trim();
                let renewPeriod = matchForRenewPeriod[1].trim();
                let startDate = startDateBeforeFormating.replace(/(\d{1,2}) (\w{3}) (\d{4})/g, function(match, p1, p2, p3) {
                    return `${p3}-${monthMap[p2]}-${p1.padStart(2, '0')}`;
                  });
                if (renewPeriod === "miesiąc") renewPeriod = "monthly";
                renewPeriod==="miesiąć" ? renewPeriod = "monthly" : (renewPeriod==="rok" ? renewPeriod = "yearly": renewPeriod);

                let app = {
                    name: name,
                    price: price,
                    startDate: startDate,
                    endDate : "",
                    renewPeriod: renewPeriod,
                    currency : "PLN",
                }

                array.push(app);
            }
        }
    }
}
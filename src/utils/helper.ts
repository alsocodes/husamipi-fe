export const parseToHex = (value: number, size: number) => {
  return Number(value).toString(16).padStart(size, '0').toUpperCase();
};

export const thousandSep = (x: number = 0) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const mapToHexRules = [
  ['sn', 0, 8],
  ['time', 8, 8],
  ['unitMainStatus', 16, 2],
  ['batteryVoltag', 18, 4],
  ['keySwitch', 22, 4],
  ['sdcStatus', 66, 2],
  ['inBoxTemp', 86, 2],
  ['outBoxTemp', 88, 2],
  ['mcuAccTime', 90, 8],
  ['engineAccTime', 98, 8],
  ['longitude', 114, 8],
  ['latitude', 122, 8],
  ['speed', 130, 2],
  ['sateliteCount', 132, 2],
];

export const hexLogToDec = (hexString: string): any => {
  // console.log(hexString);
  // const test =
  // 'B2D05E0164CA60D6801C2010000000000000000000000000000000000000000000C30000000000000000002D25000003E8000007D00000000006B95B30006F4910C80BFFFFC0';
  // B2D05E01,64CA60D6,80,1C20,10,000000000000000000000000000000000000000000,C3,000000000000000000,2D,25,000003E8,000007D0,0000,0000,06B95B30,006F4910,C8,0B,FFFF,C0
  const convertion: any = mapToHexRules.reduce((a, b) => {
    a[b[0]] = parseInt(
      hexString.substring(Number(b[1]), Number(b[1]) + Number(b[2])),
      16
    );
    // a[b[0]] = hexString.substring(Number(b[1]), Number(b[1]) + Number(b[2]));
    return a;
  }, {});

  const log = {
    ...convertion,
    coordinate: [
      convertion.longitude / 1000000,
      (convertion.latitude / 1000000) * -1,
    ],
    batteryVoltage: convertion.batteryVoltag / 100,
    keySwitch: convertion.keySwitch.toString(2).padStart(8, '0'),
    sdcStatus: convertion.sdcStatus.toString(2).padStart(8, '0'),
  };
  delete log.longitude;
  delete log.latitude;
  return log;
};

export const secToHourMeter = (seconds: number) => {
  let secondss = seconds;
  const hours = Math.floor(secondss / 3600);
  secondss = secondss - hours * 3600;
  const minutes = Math.floor(secondss / 60);
  secondss = secondss - minutes * 60;
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${Math.floor(secondss).toString().padStart(2, '0')}`;
};

export const toPascalCase = (str: string = '') => {
  return str
    .toLowerCase()
    .split(' ')
    .map((s) => {
      const first = s.charAt(0).toUpperCase();
      return `${first}${s.substring(1)}`;
    })
    .join(' ');
};

export const milisecondToHours = (seconds: number, isSec: boolean = false) => {
  let secondss = seconds;
  const hours = Math.floor(secondss / 3600000);
  secondss = secondss - hours * 3600000;
  const minutes = Math.floor(secondss / 60000);
  secondss = secondss - minutes * 60000;
  const sec = Math.floor(secondss / 1000);

  let res = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;

  if (isSec) res = `${res}:${sec.toString().padStart(2, '0')}`;
  return res;
};

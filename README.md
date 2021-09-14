# Absensi Pegawai

## Instruction

1. Clone repo
2. Run `npm install`
3. Run `node .\seed.js` for seeding
4. Run `npm run dev`

## Documentation API

### 1. Melakukan Absensi

Endpoint : (POST Method)

```
/api/absen/
```

Form-data: username, keterangan [hadir, izin, cuti, etc]

Response :

```
{
    "message": "Absensi Sukses",
    "attendant": {
        "status": "izin",
        "employeeId": "5e96cbe292b97300fc901111",
        "_id": "613b347431206592eb832e80",
        "__v": 0
    }
}
```

### 2. Membaca Laporan

Endpoint : (GET Method)

```
/api/laporan
```

Response :

```
{
  "message": "Success Getting Data",
  "result": [
    {
      "_id": "5e96cbe292b97300fc901111",
      "username": "farabiandrika",
      "name": "Muhammad Farabi Andrika",
      "absensi": [
        {
          "_id": "tidak hadir",
          "jumlah": 1
        },
        {
          "_id": "hadir",
          "jumlah": 4
        },
        {
          "_id": "izin",
          "jumlah": 2
        }
      ]
    },
    {
      "_id": "5e96cbe292b97300fc901112",
      "username": "ilhamurniawan",
      "name": "Ilham Kurniawan",
      "absensi": [
        {
          "_id": "hadir",
          "jumlah": 4
        }
      ]
    },
    {
      "_id": "5e96cbe292b97300fc901113",
      "username": "john",
      "name": "John Doe",
      "absensi": [
        {
          "_id": "cuti",
          "jumlah": 3
        },
        {
          "_id": "hadir",
          "jumlah": 1
        }
      ]
    }
  ]
}
```

### 3. Membaca Laporan Berdasarkan Keterangan

Endpoint : (GET Method)

```
/api/laporan/:keterangan
```

:keterangan (params) : [hadir, cuti, izin, etc]

#### Special Params: "telat"

Response

```
{
  "message": "Success Getting Data",
  "result": [
    {
      "_id": "5e96cbe292b97300fc901111",
      "username": "farabiandrika",
      "name": "Muhammad Farabi Andrika",
      "jumlah": 2,
      "absensi": [
        {
          "_id": "5e96cbe292b97300fc902224",
          "status": "hadir",
          "tanggal": "2021-09-12",
          "waktu": "15:30"
        },
        {
          "_id": "613f7b262339b0fd315db5e3",
          "status": "hadir",
          "tanggal": "2021-09-13",
          "waktu": "23:24"
        }
      ]
    },
    {
      "_id": "5e96cbe292b97300fc901112",
      "username": "ilhamurniawan",
      "name": "Ilham Kurniawan",
      "jumlah": 2,
      "absensi": [
        {
          "_id": "5e96cbe292b97300fc902227",
          "status": "hadir",
          "tanggal": "2021-09-11",
          "waktu": "15:00"
        },
        {
          "_id": "5e96cbe292b97300fc902228",
          "status": "hadir",
          "tanggal": "2021-09-12",
          "waktu": "15:30"
        }
      ]
    },
    {
      "_id": "5e96cbe292b97300fc901113",
      "username": "john",
      "name": "John Doe",
      "jumlah": 0,
      "absensi": [

      ]
    }
  ]
}
```

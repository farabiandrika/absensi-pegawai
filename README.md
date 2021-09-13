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
      "jumlah": 3,
      "absensi": [
        {
          "_id": "5e96cbe292b97300fc902222",
          "status": "hadir",
          "tanggal": "2021-09-10",
          "waktu": "07:30"
        },
        {
          "_id": "5e96cbe292b97300fc902224",
          "status": "hadir",
          "tanggal": "2021-09-12",
          "waktu": "15:30"
        },
        {
          "_id": "5e96cbe292b97300fc902225",
          "status": "hadir",
          "tanggal": "2021-09-13",
          "waktu": "07:30"
        }
      ]
    },
    {
      "_id": "5e96cbe292b97300fc901112",
      "username": "ilhamurniawan",
      "name": "Ilham Kurniawan",
      "jumlah": 4,
      "absensi": [
        {
          "_id": "5e96cbe292b97300fc902226",
          "status": "hadir",
          "tanggal": "2021-09-10",
          "waktu": "07:30"
        },
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
        },
        {
          "_id": "5e96cbe292b97300fc902229",
          "status": "hadir",
          "tanggal": "2021-09-13",
          "waktu": "07:30"
        }
      ]
    },
    {
      "_id": "5e96cbe292b97300fc901113",
      "username": "john",
      "name": "John Doe",
      "jumlah": 1,
      "absensi": [
        {
          "_id": "5e96cbe292b97300fc902233",
          "status": "hadir",
          "tanggal": "2021-09-13",
          "waktu": "07:30"
        }
      ]
    }
  ]
}
```

### 4. Absensi Detail

Endpoint : (GET Method)

```
/api/detail
```

Response

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
          "_id": "5e96cbe292b97300fc902222",
          "status": "hadir",
          "date": "2021-09-10 07:30:00"
        },
        {
          "_id": "5e96cbe292b97300fc902223",
          "status": "izin",
          "date": "2021-09-11 15:00:00"
        },
        {
          "_id": "5e96cbe292b97300fc902224",
          "status": "hadir",
          "date": "2021-09-12 15:30:00"
        },
        {
          "_id": "5e96cbe292b97300fc902225",
          "status": "hadir",
          "date": "2021-09-13 07:30:00"
        }
      ]
    },
    {
      "_id": "5e96cbe292b97300fc901112",
      "username": "ilhamurniawan",
      "name": "Ilham Kurniawan",
      "absensi": [
        {
          "_id": "5e96cbe292b97300fc902226",
          "status": "hadir",
          "date": "2021-09-10 07:30:00"
        },
        {
          "_id": "5e96cbe292b97300fc902227",
          "status": "hadir",
          "date": "2021-09-11 15:00:00"
        },
        {
          "_id": "5e96cbe292b97300fc902228",
          "status": "hadir",
          "date": "2021-09-12 15:30:00"
        },
        {
          "_id": "5e96cbe292b97300fc902229",
          "status": "hadir",
          "date": "2021-09-13 07:30:00"
        }
      ]
    },
    {
      "_id": "5e96cbe292b97300fc901113",
      "username": "john",
      "name": "John Doe",
      "absensi": [
        {
          "_id": "5e96cbe292b97300fc902230",
          "status": "cuti",
          "date": "2021-09-10 07:30:00"
        },
        {
          "_id": "5e96cbe292b97300fc902231",
          "status": "cuti",
          "date": "2021-09-11 07:00:00"
        },
        {
          "_id": "5e96cbe292b97300fc902232",
          "status": "cuti",
          "date": "2021-09-12 07:30:00"
        },
        {
          "_id": "5e96cbe292b97300fc902233",
          "status": "hadir",
          "date": "2021-09-13 07:30:00"
        }
      ]
    }
  ]
}
```

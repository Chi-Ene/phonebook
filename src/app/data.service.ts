import { Injectable } from '@angular/core';
import { Data } from './data';

@Injectable({
  providedIn: 'root',
})

export class DataService {
  data: Data;
  constructor() {}

  getData(): any[] {
    const data = JSON.parse(sessionStorage.getItem('data'));
    // const data = sessionStorage.getItem('data');
    return data ? data : [];
  }

  saveData(newData: Data): void {
    const data = this.getData();
    newData.id = data.length ? data.length + 1 : 1;
    data.push(newData);
    sessionStorage.setItem('data', JSON.stringify(data));
  }

  updateData(updatedData : Data): void {
    const data = JSON.parse(sessionStorage.getItem('data'));
    const itemIndex = data.findIndex((item) => item.id === updatedData.id);
    data[itemIndex] = updatedData;
    sessionStorage.setItem('data', JSON.stringify(data));
  }

  deleteData(id): void {
    const data = JSON.parse(sessionStorage.getItem('data'));
    const filteredData = data.filter((item) => item.id !== id);
    sessionStorage.setItem('data', JSON.stringify(filteredData));
  }
}

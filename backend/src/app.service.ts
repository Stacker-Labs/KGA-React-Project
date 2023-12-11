import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getMain() {
    return 'getMain';
  }

  async getSearch(query: string) {
    return 'getSearch';
  }

  async getTags() {
    return 'getTags';
  }

  async getTagName(tagname: string) {
    return 'getTagName';
  }

  async getAdmin() {
    return 'getAdmin';
  }
}

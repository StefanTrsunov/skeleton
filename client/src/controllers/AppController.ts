import { ApiService } from '../services/ApiService';

export class AppController {
  private apiService: ApiService;
  private onStateChange: () => void;

  constructor(apiService: ApiService, onStateChange: () => void) {
    this.apiService = apiService;
    this.onStateChange = onStateChange;
  }

  async loadHelloMessage(): Promise<string> {
    const result = await this.apiService.getHelloWorld();
    return result.message;
  }
}

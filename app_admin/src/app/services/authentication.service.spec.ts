import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  const mockToken = 'mock-token';
  const apiUrl = 'http://localhost:3000/api/login';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [AuthenticationService],
    });

    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no unmatched HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should call the login API and return a token', () => {
      const credentials = { email: 'test@example.com', password: 'password' };

      service.login(credentials).subscribe((response) => {
        expect(response.token).toEqual(mockToken);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST'); // Ensure it's a POST request
      expect(req.request.body).toEqual(credentials); // Verify payload
      req.flush({ token: mockToken }); // Respond with mock token
    });
  });

  describe('saveToken', () => {
    it('should save the token in localStorage', () => {
      service.saveToken(mockToken);
      expect(localStorage.getItem('travlr-token')).toEqual(mockToken);
    });
  });

  describe('isLoggedIn', () => {
    it('should return true when token exists', () => {
      localStorage.setItem('travlr-token', mockToken);
      expect(service.isLoggedIn()).toBeTrue();
    });

    it('should return false when no token exists', () => {
      localStorage.removeItem('travlr-token');
      expect(service.isLoggedIn()).toBeFalse();
    });
  });

  describe('logout', () => {
    it('should remove the token from localStorage and update the login state', () => {
      localStorage.setItem('travlr-token', mockToken);

      service.logout();
      expect(localStorage.getItem('travlr-token')).toBeNull();
    });
  });
});


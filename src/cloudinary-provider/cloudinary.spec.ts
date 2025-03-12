import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryService } from './cloudinary.service';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

jest.mock('cloudinary', () => ({
  v2: {
    config: jest.fn(),
    uploader: {
      upload_stream: jest.fn(),
    },
  },
}));

describe('CloudinaryService', () => {
  let service: CloudinaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudinaryService],
    }).compile();

    service = module.get<CloudinaryService>(CloudinaryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload a file successfully', async () => {
    const mockFile = { buffer: Buffer.from('test file data') } as Express.Multer.File;
    const mockResponse: UploadApiResponse = {
      public_id: 'test_public_id',
      secure_url: 'https://cloudinary.com/test_image.jpg',
    } as UploadApiResponse;

    // Mock the Cloudinary upload_stream method
    const uploadMock = jest.fn((options, callback) => {
      return {
        end: () => {
          callback(null, mockResponse); // Simulate success
        },
      };
    });

    (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(uploadMock);

    const result = await service.uploadFile(mockFile);

    expect(result).toEqual(mockResponse);
    expect(uploadMock).toHaveBeenCalled();
  });

  it('should throw an error when upload fails', async () => {
    const mockFile = { buffer: Buffer.from('test file data') } as Express.Multer.File;
    const mockError = new Error('Upload failed');

    // Mock the Cloudinary upload_stream method
    const uploadMock = jest.fn((options, callback) => {
      return {
        end: () => {
          callback(mockError, null); // Simulate failure
        },
      };
    });

    (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(uploadMock);

    await expect(service.uploadFile(mockFile)).rejects.toThrow('Upload failed');
    expect(uploadMock).toHaveBeenCalled();
  });
});

import { getImageURL } from '../utils';

describe('getImageURL', () => {
    test('Should return image URL without a folder', () => {
        expect(getImageURL('image.jpg')).toBe('/images/image.jpg');
        expect(getImageURL('image2.jpg')).toBe('/images/image2.jpg');
        expect(getImageURL('image3.jpg')).toBe('/images/image3.jpg');
    });
    test('Should return image URL inside a folder', () => {
        expect(getImageURL('image.jpg', 'folder1')).toBe('/images/folder1/image.jpg');
        expect(getImageURL('image.jpg', 'folder2')).toBe('/images/folder2/image.jpg');
        expect(getImageURL('image.jpg', 'folder3')).toBe('/images/folder3/image.jpg');
    });
});

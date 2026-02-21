// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('./services/ghibli', () => ({
  getFilms: jest.fn().mockResolvedValue([
    {
      id: '1',
      title: 'Castle in the Sky',
      original_title: '天空の城ラピュタ',
      original_title_romanised: 'Tenkū no Shiro Rapyuta',
      image: 'castle.jpg',
      movie_banner: 'banner.jpg',
      director: 'Hayao Miyazaki',
      producer: 'Isao Takahata',
      release_date: '1986',
      running_time: '124',
      rt_score: '95',
      description: 'Adventure in the sky',
      people: [],
    },
    {
      id: '2',
      title: 'Spirited Away',
      original_title: '千と千尋の神隠し',
      original_title_romanised: 'Sen to Chihiro no Kamikakushi',
      image: 'spirited.jpg',
      movie_banner: 'banner2.jpg',
      director: 'Hayao Miyazaki',
      producer: 'Toshio Suzuki',
      release_date: '2001',
      running_time: '125',
      rt_score: '97',
      description: 'Adventure in spirit world',
      people: [],
    },
  ]),
}));

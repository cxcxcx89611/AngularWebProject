import { TaskmgrguiPage } from './app.po';

describe('taskmgrgui App', () => {
  let page: TaskmgrguiPage;

  beforeEach(() => {
    page = new TaskmgrguiPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});

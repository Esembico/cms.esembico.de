import stateRegister from './stateRegister';
import teamOptions from './options/teamOptions';
import recommendationOptions from './options/recommendationOptions';
import imageOptions from './options/imageOptions';
import prototypeOptions from './options/prototypeOptions';
import pageOptions from './options/pageOptions';

stateRegister.setGlobalOptions({
  buildValidationFromEditor: true,
  getNextPageNumber: (json) => {
    const pageRegex = /[\w\W]*page=([0-9]*)/;
    if (json.next) {
      const groups = json.next.match(pageRegex);
      return parseInt(groups[1]);
    } else {
      return null;
    }
  }
});
stateRegister.register('team', teamOptions);
stateRegister.register('recommendations', recommendationOptions);
stateRegister.register('prototypes', prototypeOptions);
stateRegister.register('pages', pageOptions);
stateRegister.register('images', imageOptions);

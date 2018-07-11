/*= == styles === */
import 'normalize.css';
import './scss/layout/base.scss';


/*= == modules === */
import { ajaxFunc } from './js/ajaxFunc';
import { search } from './js/search';
import { save } from './js/saveContacts';


ajaxFunc();
search();
save();

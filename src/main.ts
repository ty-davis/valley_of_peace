import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import './style.css'
import App from './App.vue'

import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import Dialog from 'primevue/dialog';
import DialogService from 'primevue/dialogservice';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Image from 'primevue/image';
import MultiSelect from 'primevue/multiselect';
import Textarea from 'primevue/textarea';


const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.use(DialogService);

app.component("Card", Card);
app.component("Accordion", Accordion);
app.component("AccordionPanel", AccordionPanel);
app.component("AccordionHeader", AccordionHeader);
app.component("Dialog", Dialog);
app.component("Button", Button);
app.component("Image", Image);
app.component("MultiSelect", MultiSelect);
app.component("Textarea", Textarea);


app.mount('#app');

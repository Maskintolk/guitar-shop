import { Story, Meta } from '@storybook/web-components';
import { Case, CaseProps } from './Case';

import { FilterType } from '../types/FilterType';

export default {
  title: 'Valtech/Case',
} as Meta;

const Template: Story<Partial<CaseProps>> = (args) => Case(args);
const filters = [
  {
    name: 'DAngelico',
    isActive: false
  },
  {
    name: 'Duesenberg',
    isActive: false
  },
  {
    name: 'Fender',
    isActive: false
  },
  {
    name: 'Gibson',
    isActive: false
  },
  {
    name: 'Ibanez',
    isActive: true
  }
] as FilterType[];

export const Demo = Template.bind({});
Demo.args = {
  filters: []
};


import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './PublicImage.stories';

const { Default, NoImagePath } = composeStories(stories);

describe('PublicImage', () => {
  it('renders an image tag with the proper src attribute', () => {
    const { container } = render(<Default />);
    const element = container.querySelector('img');
    expect(element).not.toBeNull();
    if (!element) {
      return;
    }
    expect(element.src).toMatch(
      /^https?:\/\/[^/]*\/[^/]*\/emoji-cards\/images\/hello\.jpg/,
    );
    expect(element.getAttribute('class')).toBe('screen');
    expect(element.getAttribute('alt')).toBe('Some alternative text');
  });

  it('renders without src if there is no image path', () => {
    const { container } = render(<NoImagePath />);
    const element = container.querySelector('img');
    if (!element) {
      return;
    }
    expect(element.src).toBe('');
  });
});

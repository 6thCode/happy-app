import TestRenderer from 'react-test-renderer';
import Main from '../assets/pages/Main'

test('Render is Good', () => {
    const testRender = TestRenderer.create(<Main />)
    const instance = testRender.root;
    expect(instance).toBeTruthy()
})

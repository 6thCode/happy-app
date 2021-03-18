import TestRenderer from 'react-test-renderer';
import Main from '../assets/pages/Main'

// Test if render is working fine
test('Render is Good', () => {
    const testRender = TestRenderer.create(<Main />)
    const instance = testRender.root;
    expect(instance).toBeTruthy()
})
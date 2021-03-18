import TestRenderer from 'react-test-renderer';
import Category from '../assets/pages/Category'

// Test if render is working fine
test('Render is Good', () => {
    const testRender = TestRenderer.create(<Category />)
    const instance = testRender.root;
    expect(instance).toBeTruthy()
})
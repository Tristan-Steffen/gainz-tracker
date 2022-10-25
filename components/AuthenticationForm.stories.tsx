
import AuthenticationForm from './AuthenticationForm';
import Form from './Form';
import InputText from './InputText';

const config = {
  title: 'Form',
  component: Form,
};

export const Default = () => <Form title="Login" action={"/"}>
  <InputText type="username" name="username" label="Username" />
  <InputText type="password" name="password" label="password" />
</Form>

export const Primary = () => <AuthenticationForm actionProp={"/"} />;

export default config

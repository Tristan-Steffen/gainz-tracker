import GooeyButton from './GooeyButton';

const config = {
  title: 'GooeyButton',
  component: GooeyButton,
  argTypes: {
    startAngle: {
      control: { type: 'number', min: 0, max: 360, value: 80 },
    },
    endAngle: {
      control: { type: 'number', min: 0, max: 360, value: 235 },
    },
  },
};

export const Primary = ({ startAngle = 80, endAngle = 235 }: { startAngle: number, endAngle: number }) => <GooeyButton startAngle={startAngle} endAngle={endAngle}>
  <button>Click Me</button>
  <button>Click Me</button>
  <button>Click Me</button>
</GooeyButton>;


export default config

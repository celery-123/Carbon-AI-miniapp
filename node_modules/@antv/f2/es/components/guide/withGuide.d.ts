import { ComponentType, ClassComponent } from '@antv/f-engine';
import Chart, { ChartChildProps, Point } from '../../chart';
import { AnimationProps } from '@antv/f-engine';
export interface GuideProps {
    records: any;
    onClick?: (ev: any) => void;
    animation?: ((points: Point[], chart: Chart) => AnimationProps) | AnimationProps;
    precise?: boolean;
    [key: string]: any;
}
export default function <IProps extends GuideProps = GuideProps>(View: ComponentType<IProps & ChartChildProps>): ClassComponent<IProps & ChartChildProps>;

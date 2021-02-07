// import { initial } from "lodash";
// import { connect } from "react-redux";
// import { compose, lifecycle, withState } from "recompose";
// import { selectIsLoading } from "../redux/selectors";

// const allSlicesLoaded = (slicesLoaded, slicesToLoad) => !slicesToLoad.some(x => !slicesLoaded.includes(x));

// export const withInitialLoaded = ({slices}) => compose(
//     withState('slicesLoaded', 'setSlicesLoaded', []),
//     withState('initialLoaded', 'setInitialLoaded', false),
//     connect(
//         (state, props) => {
//             const {
//                 initialLoaded,
//                 slicesLoaded,
//                 setInitialLoaded,
//                 setSlicesLoaded
//             } = props;
//             if (initialLoaded) return;
//             if (allSlicesLoaded(slicesLoaded, slices)) {
//                 setInitialLoaded(true);
//                 return {};
//             }

//             slices.forEach(x => {
//                 const loaded = !selectIsLoading(state, x);
//                 if (loaded && !slicesLoaded.includes(x)) {
//                     setSlicesLoaded([
//                         ...slicesLoaded,
//                         x
//                     ])
//                 }
//             });
            
//             return {};
//         }
//     )
    
// )
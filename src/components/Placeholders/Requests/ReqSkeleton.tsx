
import './ReqSkeleton.css'

const ReqSkeleton = () => {

    const skeletons = Array(6).fill(0).map( () => <div className="req--skeleton"></div>)

    return skeletons
}

export default ReqSkeleton
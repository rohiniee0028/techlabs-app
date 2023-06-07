import { Button } from "@chakra-ui/react";
import "../styles/Pagination.css";
import { MdChevronLeft, MdChevronRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
export const Pagination = ({ totalPage, page, onChange }) => {
    const pages = new Array(totalPage).fill(0).map((a, i) =>
        <Button key={i} borderRadius={"50%"} backgroundColor={page===i+1 ? "#32d6e9" : "transparent"} color={page===i+1 ? "white" : "black"} _hover={{backgroundColor:"transparent", color:"black"}} onClick={() => onChange(i + 1)} disabled={page === (i + 1)}>{i + 1}</Button>
    )
    return (
        <div className='pagination_div'>
            <button className='btn_prev' disabled={page == 1} onClick={() => onChange(page - 1)}><MdKeyboardDoubleArrowLeft/> <MdChevronLeft/></button>
            {pages}
            <button className='btn_next' disabled={page == totalPage} onClick={() => onChange(page + 1)}><MdChevronRight/> <MdKeyboardDoubleArrowRight/></button>
        </div>
    )
}
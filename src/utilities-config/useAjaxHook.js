import { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelToken,
  getAllDepartments,
  getAllEvangelisms,
  getAllUsers,
  getAllSouls,
  getCellEvents,
  getCells,
} from "../redux/actions";
import axiosInstance from "./axios";

let membersCurrent = [];
let cellEventsCurrent = [];
let soulsCurrent = [];
let evangelismsCurrent = [];
const allData = (currentData, newData) => {
  membersCurrent = [...membersCurrent, ...newData];
  soulsCurrent = [...soulsCurrent, ...newData];
  evangelismsCurrent = [...evangelismsCurrent, ...newData];
  let result = [];
  const equalObj = (a, b) => a._id === b._id;
  currentData.forEach((item) => {
    const itemResult = result.find((resultItem) => equalObj(item, resultItem));
    if (!itemResult) {
      result.push(item);
    }
  });
  return result;

  // if(currentData.length > 0){
  //   return currentData.filter(data => {
  //     return newData.find(item => item._id === data._id)
  //   })
  // } else { return newData}
};
export default function useAjaxHook(query, pageNumber, other) {
  const membersData = useSelector((state) => state.users);
  const souls = useSelector((state) => state.allSouls);
  const evangelisms = useSelector((state) => state.evangelisms);

  const execMembers =
    other.target === "members" || other.target === "member" ? true : false;
  const execCell =
    other.target === "cells" || other.target === "cell" ? true : false;
  const execDepartments =
    other.target === "departments" ||
    other.target === "departments" ||
    other.target === "PCD" ||
    other.target === "cell"
      ? true
      : false;
  const execSouls = other.target === "souls";
  const execEvangelism = other.target === "evangelisms" ? true : false;
  const dispatch = useDispatch();
  const [oldPage, setOldPage] = useState([]);

  // useEffect(()=>data.current = [],[])

  useEffect(() => {
    if (oldPage !== pageNumber && other.open) {
      if (execMembers && !other.isVisitors) {
        dispatch(
          getAllUsers({
            targetId: other.whoId,
            fetch: pageNumber,
            query,
            target: other.who,
            action: other.action,
            isMembers: other.isMembers,
          })
        );
      }
      if (execMembers && other.isVisitors) {
        dispatch(
          getAllUsers({
            targetId: other.whoId,
            fetch: pageNumber,
            query,
            target: other.who,
            action: other.action,
            isMembers: other.isMembers,
            isVisitors: other.isVisitors,
          })
        );
      } else if (execEvangelism) {
        dispatch(
          getAllEvangelisms({
            query,
            cAccountId: other.cAccountId,
            evgForTargetId: other.evgForTargetId,
            eventTargetId: other.eventTargetId,
            fe: pageNumber,
          })
        );
      } else if (execSouls) {
        dispatch(
          getAllSouls({
            query,
            cAccountId: other.cAccountId,
            evgForTargetId: other.evgForTargetId,
            eventTargetId: other.eventTargetId,
            fetch: other.fetch,
            soulWinner: other.soulWinner,
            evangelismId: other.evangelismId,
          })
        );
      }
      // return ()=>
      setOldPage(pageNumber);
    }
  }, [other.target, pageNumber, query, execMembers, oldPage, other.open]);

  const returnObj = {
    hasMore: membersData.members.length === 0 ? false : true,
    data:
      execMembers && !other.isVisitors
        ? allData(membersCurrent, membersData.members)
        : execMembers && other.isVisitors
        ? membersData.visitors
        : execEvangelism
        ? allData(evangelismsCurrent, evangelisms.data)
        : "",

    loading: execMembers
      ? membersData.loading
      : execEvangelism
      ? evangelisms.loading
      : "",

    error: execMembers
      ? membersData.error
      : execEvangelism
      ? evangelisms.error
      : "",
  };
  return { ...returnObj };
}

import { useRef, useCallback, memo } from "react";
import {
  DepartmentAndCellCard,
  EvangelismCard,
  MeetingCard,
  TheImageCard,
} from "../bucket";

export default memo(function InfiniteScroll(props) {
  const {
    loading,
    hasMore,
    setPageNumber,
    type,
    index,
    item,
    onClick,
    data,
    info,
    target,
    options,
  } = props;

  const observer = useRef();
  const lastDataRefElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, setPageNumber, hasMore]
  );
  const imageCard = (ref) => {
    if (ref) {
      return (
        <TheImageCard
          ref={lastDataRefElement}
          firstName={item?.firstName}
          surname={item?.surname}
          onClick={onClick}
          imageURL={item?.image || item?.picture}
          itemName={item?.name}
          cellId={item?.member?.cell}
          accountId={item?._id}
          bornAgain={item?.member?.salvation?.bornAgain}
        />
      );
    } else {
      return (
        <TheImageCard
          firstName={item?.firstName}
          surname={item?.surname}
          onClick={onClick}
          imageURL={item?.image || item?.picture}
          itemName={item?.name}
          cellId={item?.member?.cell}
          accountId={item?._id}
          bornAgain={item?.member?.salvation?.bornAgain}
        />
      );
    }
  };

  const meetingCard = (ref) => {
    if (ref) {
      return (
        <MeetingCard
          ref={ref && lastDataRefElement}
          data={item}
          weekName={item?.weekName}
          aimAndPurpose={item?.aimAndPurpose}
          instruction={item?.instruction}
          date={item?.date?.fullDate}
          updatedAt={item?.updatedAt}
          target={target}
          name={item?.cellId?.name}
          createdAt={item?.createdAt}
          url={options?.url && `${options?.url}?d=${item?._id}`}
          slide={options?.slide && options?.slide}
          report={{
            name: item?.name,
            start: item?.date?.fullDate,
            reportReady: item?.sendToPFCC,
            isMeetingHeld: item?.pfcc?.isMeetingHeld,
            willHold: item?.sentToMembers,
            approved: item?.pfcc?.approval?.isReportApproved,
            offeringApproved: item?.pfcc?.approval?.offeringApproved,
          }}
        />
      );
    } else {
      return (
        <MeetingCard
          data={item}
          weekName={item?.weekName}
          aimAndPurpose={item?.aimAndPurpose}
          instruction={item?.instruction}
          date={item?.date?.fullDate}
          updatedAt={item?.updatedAt}
          target={target}
          name={item?.cellId?.name}
          createdAt={item?.createdAt}
          url={options?.url && `${options?.url}?d=${item?._id}`}
          slide={options?.slide && options?.slide}
          report={{
            name: item?.name,
            start: item?.date?.fullDate,
            reportReady: item?.sendToPFCC,
            isMeetingHeld: item?.pfcc?.isMeetingHeld,
            willHold: item?.sentToMembers,
            approved: item?.pfcc?.approval?.isReportApproved,
            offeringApproved: item?.pfcc?.approval?.offeringApproved,
          }}
        />
      );
    }
  };

  const departmentAndCellCard = (ref) => {
    if (ref) {
      return (
        <DepartmentAndCellCard
          ref={lastDataRefElement}
          imageURL={item?.picture}
          itemName={item?.name}
          leaderFN={item?.leader?.firstName}
          leaderSN={item?.leader?.surname}
          assistFN={item?.assist?.firstName}
          assistSN={item?.assist?.surname}
          onClick={onClick}
        />
      );
    } else {
      return (
        <DepartmentAndCellCard
          imageURL={item?.picture}
          itemName={item?.name}
          leaderFN={item?.leader?.firstName}
          leaderSN={item?.leader?.surname}
          assistFN={item?.assist?.firstName}
          assistSN={item?.assist?.surname}
          onClick={onClick}
        />
      );
    }
  };

  const evangelismCard = (ref) => {
    if (ref) {
      return (
        <EvangelismCard
          ref={lastDataRefElement}
          item={item}
          accountId={info.accountId}
          evgForTargetId={info.evgForTargetId}
          cAccountId={info.cAccountId}
          eventTargetId={info.eventTargetId}
          eventTarget={info.eventTarget}
        />
      );
    } else {
      return (
        <EvangelismCard
          item={item}
          accountId={info.accountId}
          evgForTargetId={info.evgForTargetId}
          cAccountId={info.cAccountId}
          eventTargetId={info.eventTargetId}
          eventTarget={info.eventTarget}
        />
      );
    }
  };

  const content = (type) => {
    switch (type) {
      case "imageCard":
        return data.length === index + 1 ? imageCard(true) : imageCard();
      case "meetingCard":
        return data.length === index + 1 ? meetingCard(true) : meetingCard();
      case "department":
        return data.length === index + 1
          ? departmentAndCellCard(true)
          : departmentAndCellCard();
      case "evangelism":
        return data.length === index + 1
          ? evangelismCard(true)
          : evangelismCard();
      default:
        return;
    }
  };
  return content(type);
});

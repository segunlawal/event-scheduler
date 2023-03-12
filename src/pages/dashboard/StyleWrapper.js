import styled from "@emotion/styled";

export const StyleWrapper = styled.div`
.fc{
    margin-inline: 1rem;
}
  .fc-button.fc-prev-button,
  .fc-button.fc-next-button {
    background: #217bf4;
    background-image: none;
  }
  .fc-event-title.fc-sticky {
    color: #ffff;
  }
  .fc-event-title-container {
    background: #217bf4;
  }
  .fc .fc-daygrid-day.fc-day-today {
    background: rgba(255, 175, 46, 0.6);
  }
  .fc .fc-button-primary:disabled {
    background: #217bf4;
    color: white;
    border: none;
    cursor: pointer;
  }
  .fc .fc-button:disabled {
    opacity: 1;
  }
  .fc-icon-chevron-left:before,
  .fc-icon-chevron-right:before {
    color: white;
  }
  .fc-today-button.fc-button.fc-button-primary{
    background: #217bf4;
    border:none;
  }
  
}
@media (max-width: 767.98px) {
    .fc .fc-toolbar.fc-header-toolbar {
        display: block;
        text-align: center;
    }

    .fc-header-toolbar .fc-toolbar-chunk {
        display: block;
    }
}
`;

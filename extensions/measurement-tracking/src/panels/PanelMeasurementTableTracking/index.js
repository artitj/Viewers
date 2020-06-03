import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  MeasurementsPanel,
  Button,
  ButtonGroup,
  Icon,
  IconButton,
} from '@ohif/ui';
import { useTrackedMeasurements } from '../../getContextModule';

function PanelMeasurementTableTracking({ servicesManager, commandsManager }) {
  const { MeasurementService } = servicesManager.services;
  const [
    trackedMeasurements,
    sendTrackedMeasurementsEvent,
  ] = useTrackedMeasurements();
  const [displayMeasurements, setDisplayMeasurements] = useState([]);

  // TODO: initial measurements + initial tracked?
  // TODO: measurements subscribtion
  // TODO: tracked changes

  // Initial?
  useEffect(() => {
    const measurements = MeasurementService.getMeasurements();
    const mappedMeasurements = measurements.map(m =>
      _mapMeasurementToDisplay(m)
    );
    setDisplayMeasurements(mappedMeasurements);
    // eslint-ignore-next-line
  }, [MeasurementService, trackedMeasurements]);

  // TODO: Listen for measurement service "adds" (really shouldn't be added until cornerstone-tools "complete")
  useEffect(() => {
    // const { unsubscribe } = MeasurementService.subscribe(
    //   MeasurementService.EVENTS.MEASUREMENT_ADDED,
    //   ({ source, measurement }) => {
    //     const {
    //       referenceSeriesUID: SeriesInstanceUID,
    //       referenceStudyUID: StudyInstanceUID,
    //     } = measurement;
    //     sendTrackedMeasurementsEvent('TRACK_SERIES', {
    //       StudyInstanceUID,
    //       SeriesInstanceUID,
    //     });
    //     console.log('PANEL:', measurement);
    //     // console.log('Mapped:', annotation);
    //   }
    // );
    // return unsubscribe;
  }, [MeasurementService, sendTrackedMeasurementsEvent]);

  console.log('MeasurementTable rendering!!!!!!!!!!!!!');

  const actionButtons = (
    <React.Fragment>
      <ButtonGroup onClick={() => alert('Export')}>
        <Button
          className="px-2 py-2 text-base text-white bg-black border-primary-main"
          size="initial"
          color="inherit"
        >
          Export
        </Button>
        <IconButton
          className="px-2 text-white bg-black border-primary-main"
          color="inherit"
          size="initial"
        >
          <Icon name="arrow-down" />
        </IconButton>
      </ButtonGroup>
      <Button
        className="px-2 py-2 ml-2 text-base text-white bg-black border border-primary-main"
        variant="outlined"
        size="initial"
        color="inherit"
        onClick={() => alert('Create Report')}
      >
        Create Report
      </Button>
    </React.Fragment>
  );

  const descriptionData = {
    date: '07-Sep-2010',
    modality: 'CT',
    description: 'CHEST/ABD/PELVIS W CONTRAST',
  };

  const activeMeasurementItem = 0;

  const measurementTableData = {
    title: 'Measurements',
    amount: displayMeasurements.length,
    data: displayMeasurements,
    // new Array(10).fill({}).map((el, i) => ({
    //   id: i + 1,
    //   label: 'Label short description',
    //   displayText: '24.0 x 24.0 mm (S:4, I:22)',
    //   isActive: activeMeasurementItem === i + 1,
    // })),
    // onClick: id => setActiveMeasurementItem(s => (s === id ? null : id)),
    onClick: () => {},
    onEdit: id => alert(`Edit: ${id}`),
  };

  return (
    <MeasurementsPanel
      descriptionData={descriptionData}
      measurementTableData={measurementTableData}
      actionButtons={actionButtons}
    />
  );
}

PanelMeasurementTableTracking.propTypes = {};

// 'id',
// 'SOPInstanceUID',
// 'FrameOfReferenceUID',
// 'referenceStudyUID',
// 'referenceSeriesUID',
// 'label',
// 'description',
// 'type',
// 'unit',
// 'area', // TODO: Add concept names instead (descriptor)
// 'points',
// 'source',
function _mapMeasurementToDisplay(measurement) {
  const { id, label, description: displayText } = measurement;
  return {
    id,
    label, // 'Label short description',
    displayText, // '24.0 x 24.0 mm (S:4, I:22)',
    // TODO: handle one layer down
    isActive: false, // activeMeasurementItem === i + 1,
  };
}

export default PanelMeasurementTableTracking;
